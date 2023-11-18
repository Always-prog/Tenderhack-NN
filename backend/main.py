
# TODO:
"""
1. Реализовать подключение к таблицам баз данных контрактов через SQLAlchemy.
2. Реализовать поиск по фильтрам
"""
from app import db, app
from supplier import Supplier


@app.route("/search")
def search_suppliers():
    """
    TODO: Реализовать поиск по ИНН или по тексту продажи.
    TODO: Реализовать возврат в формате данных о поставщике вместе с его рейтигном (рейтинг надо считать)
    """
    print(Supplier(db.session).get_contracts())
    return "supp"