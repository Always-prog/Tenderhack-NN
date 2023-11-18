from flask import request, jsonify
# TODO:
"""
1. Реализовать подключение к таблицам баз данных контрактов через SQLAlchemy.
2. Реализовать поиск по фильтрам
"""
from app import db, app
from supplier import Supplier
import numpy


@app.route("/search", methods=["GET"])
def search_suppliers():
    """
    TODO: Реализовать поиск по ИНН или по тексту продажи.
    TODO: Реализовать возврат в формате данных о поставщике вместе с его рейтигном (рейтинг надо считать)
    """
    
    result = ''
    
    inn = request.args.get('inn')
    kpgz = request.args.get('kpgz')

    if inn or kpgz:
        suppliers = Supplier.search(db.session(), inn, kpgz)

        data = [{
            'inn': supp[0],
            'kpgz': supp[1]
        } for supp in suppliers ]

        result = jsonify(data)

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

    target_avg_price = Supplier.avg_price(db.session(), target_inn, kpgz)
    print(target_avg_price)

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

    return ''

