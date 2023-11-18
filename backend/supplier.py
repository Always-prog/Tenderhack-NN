from models import Contracts


class Supplier:
    """
    Класс для работы с поставщиком.
    В задачи класса будет входить поиск по поставщикам и расчет рейтинга.
    Используется этот класс в конечных точках
    """
    def __init__(self, db):
        self.db = db

    def get_contracts(self):
        return self.db.query(Contracts).limit(5).all()