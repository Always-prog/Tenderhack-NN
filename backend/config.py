from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base


# TODO: Вынести это в переменные среды
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://superset:superset@172.17.64.1/superset'