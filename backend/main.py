from flask import request, jsonify
from app import db, app
from models import Contracts
from supplier import Supplier, search_suppliers_by_kpgzs


@app.route("/search", methods=["GET"])
def search_suppliers():
    """
    TODO: Реализовать поиск по ИНН или по тексту продажи.
    TODO: Реализовать возврат в формате данных о поставщике вместе с его рейтигном (рейтинг надо считать)
    """
    
    result = ''
    
    inn = request.args.get('inn')
    kpgzs = request.args.get('kpgzs', '').split(',')

    if inn:
        return Supplier(int(inn)).supplier_info

    if kpgzs:
        result = jsonify([s.supplier_info for s in search_suppliers_by_kpgzs(kpgzs)])

    return result


@app.route("/compare/bymarket", methods=["GET"])
def compare_bymarket():
    """
    На вход приходит inn и фильтр по kpgz (обязательно).
    TODO: Реализовать сравнение с рынком возврат данных в формате {
        "target_inn": <исконный ИНН>,
        "target_avg_price": средняя цена по ИНН,
        "market_avg_price": средняя цена по рынку
    }
    """

    result = ''

    target_inn = request.args.get('inn')
    kpgz = request.args.get('kpgz')

    target_supplier = Supplier.search_by_filters(target_inn, kpgz)[0]['avg_price']

    target_avg_price = Supplier.avg_price(db.session(), target_inn, kpgz)

    result = target_avg_price

    return result


@app.route("/compare/bygroup", methods=["GET"])
def compare_bygroup():
    """
    на выход список INN через запятую и фильтр по kpgz
    TODO: Реализовать сравнение друг с другом. Ровно как и с маркетом, только сравнение нужно делать каждого,
    и среди среза внутри пришедших ИНН.
    Результат должен быть вида: [
    {inn: инн, avg_price: цена},
    {inn: инн2, avg_price: цена},
    {inn: инн3, avg_price: цена},
    ]
    """

    print(db.session().query(Contracts).limit(1).all()[0].ks)
    return ''

    return ''

