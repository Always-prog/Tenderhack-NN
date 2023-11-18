

# Подключить используя SQLAlchemy таблички поставщиков

from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Contracts(Base):
    __tablename__ = 'contracts'

    ks_id = Column(Integer, primary_key=True, unique=True)
    contract_id = Column(Integer, primary_key=True, unique=True)
    conclusion_date = Column(TIMESTAMP)

    # Закончить табличку