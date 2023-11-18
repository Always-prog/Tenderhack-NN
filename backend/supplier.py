from models import Contracts, Ks, ContractExecution


class Supplier:
    """
    Класс для работы с поставщиком.
    В задачи класса будет входить поиск по поставщикам и расчет рейтинга.
    Используется этот класс в конечных точках
    """
    def __init__(self, supplier_inn: int):
        self.inn = supplier_inn

    @staticmethod
    def search(db, inn: str, kpgz: str):
        suppliers = None
        if inn and kpgz:
            # suppliers = db.query(Contracts.supplier_inn, Contracts.ks.ks_id) \
            #     .filter(Contracts.supplier_inn == inn) \
            #     .group_by(Contracts.supplier_inn).all()
            suppliers = db.query(Contracts.supplier_inn, Ks.participant_inn).join(Ks, Contracts.supplier_inn == Ks.participant_inn) \
                .group_by(Contracts.supplier_inn, Ks.participant_inn).limit(100).all()

        elif inn and not kpgz:
            suppliers = db.query(Contracts.supplier_inn) \
                .filter_by(supplier_inn=int(inn)) \
                .group_by(Contracts.supplier_inn).all()
        
        elif not inn and kpgz:
            suppliers = db.query(Ks.participant_inn) \
                .filter_by(kpgz=kpgz) \
                .group_by(Ks.participant_inn).all()
        
        
        return suppliers


    def calc_supplier_rating(self, db, experience_weight, reliability_weight, activity_weight, speedily_weight):
        """
        1. Опыт. Есть ли хоть один успешно заверешнных контракт
        2. Надежность.
        3. Активность.
        4. Срок доставки.
        """

        # TODO: Сделать покрасивее
        reliability = 0

        is_have_any_finished_contract = len(
            self.db.query(Contracts) \
                .filter_by(supplier_inn=self.inn) \
                .filter_by(status='Исполнен').all()
        ) > 0

        experience = experience_weight if is_have_any_finished_contract else 0

        has_ks_violations = len(
            self.db.query(Ks) \
                .filter_by(participant_inn=self.inn) \
                .filter_by(violations='Да').all()
        ) > 0

        has_contracts_violations = len(
            self.db.query(Ks) \
                .filter_by(participant_inn=self.inn) \
                .filter_by(violations='Да').all()
        ) > 0

        reliability += 0 if has_ks_violations else 0.5
        reliability += 0 if has_contracts_violations else 0.5

        is_have_any_activity = len(
            self.db.query(Ks) \
                .filter_by(participant_inn=self.inn).all()
        ) > 0

        activity = activity_weight if is_have_any_activity else 0

        is_speedily = len(
            self.db.query(ContractExecution) \
                .filter_by(supplier_inn=self.inn)
                .filter(ContractExecution.actual_delivery_date < ContractExecution.scheduled_delivery_date)
                .all()
        ) > 0

        speedily = (1 if is_speedily else 0) * speedily_weight

        return experience, reliability, activity, speedily
