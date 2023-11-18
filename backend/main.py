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

    
    inn = request.args.get('inn')
    kpgz = request.args.get('kpgz')
    data = []

    suppliers = Supplier.search(db.session(), inn, kpgz)

    data = [{
        'inn': inn[0]
    } for inn in suppliers ]

    # if q:
    #     suppliers = Supplier.search_suppliers(db.session(), q)
    #     data += [{
    #         'inn': supplier.supplier_inn
    #     } for supplier in suppliers ]    
    
    # if k:
    #     suppliers = Supplier.search_kpgz(db.session(), k)
    #     data += [{
    #         'inn': supplier.participant_inn
    #     } for supplier in suppliers ]

    #print(data)


    return jsonify(data)