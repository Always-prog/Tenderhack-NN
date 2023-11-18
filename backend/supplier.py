from typing import List

from sqlalchemy import func

from app import db
from models import Contracts, Ks, ContractExecution


def search_suppliers_by_kpgzs(kpgzs: List[str]):
    if not kpgzs:
        return []

    query = db.session.query(Contracts.supplier_inn, Ks.kpgz).join(Ks, Contracts.ks_id == Ks.ks_id)
    query = query.group_by(Contracts.supplier_inn, Ks.kpgz)
    query = query.filter(Ks.kpgz.in_(kpgzs))
    query = query.limit(100)

    return [Supplier(row[0]) for row in query.all()]


class Supplier:
    """
    Класс для работы с поставщиком.
    В задачи класса будет входить поиск по поставщикам и расчет рейтинга.
    Используется этот класс в конечных точках
    """

    def __init__(self, supplier_inn: int):
        self.inn = supplier_inn

    @property
    def supplier_info(self):
        kpgzs = [row[1] for row in db.session.query(Contracts, Ks.kpgz) \
            .join(Ks, Contracts.ks_id == Ks.ks_id) \
            .filter(Contracts.supplier_inn == self.inn) \
            .all()]

        return {
            'supplier_inn': self.inn,
            'kpgzs': kpgzs,
            'activity': self.activity_metric(),
            'speedily': self.speedily_metric(),
            'experience': self.experience_metric(),
            'reliability': self.reliability_metric()
        }

    @staticmethod
    def avg_price(db, inn: str, kpgz: str):
        result = db.query(func.avg((Contracts.price) \
                                   .join(Ks, Contracts.ks_id == Ks.ks_id) \
                                   .filter(Contracts.supplier_inn == int(inn)) \
                                   .filter(Ks.kpgz == kpgz)))
        return result

    def experience_metric(self, weight=25):
        """Опыт"""
        has_experience = len(
            db.session.query(Contracts)
            .filter_by(supplier_inn=self.inn)
            .filter_by(status='Исполнен')
            .all()
        ) > 0
        return weight if has_experience else 0

    def reliability_metric(self, weight=25):
        """Надежность"""
        reliability = 0
        has_ks_violations = len(
            db.session.query(Ks) \
                .filter_by(participant_inn=self.inn) \
                .filter_by(violations='Да').all()
        ) > 0

        has_contracts_violations = len(
            db.session.query(Ks) \
                .filter_by(participant_inn=self.inn) \
                .filter_by(violations='Да').all()
        ) > 0

        reliability += 0 if has_ks_violations else 0.5
        reliability += 0 if has_contracts_violations else 0.5
        return reliability * weight

    def activity_metric(self, weight=25):
        """Активность"""
        is_have_any_activity = len(
            db.session.query(Ks) \
                .filter_by(participant_inn=self.inn).all()
        ) > 0

        return weight if is_have_any_activity else 0

    def speedily_metric(self, weight=25):
        """Скорость поставки"""
        is_speedily = len(
            db.session.query(ContractExecution) \
                .filter_by(supplier_inn=self.inn)
                .filter(ContractExecution.actual_delivery_date < ContractExecution.scheduled_delivery_date)
                .all()
        ) > 0

        return weight if is_speedily else 0
