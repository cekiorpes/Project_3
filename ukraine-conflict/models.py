from app import db

class Ukraine(db.Model):
    __tablename__ = "Ukraine_Conflict"

    EVENT_ID_CNTY = db.Column(db.String(), primary_key=True)
    EVENT_ID_NO_CNTY = db.Column(db.Integer(), primary_key=True)
    EVENT_DATE = db.Column(db.String())
    EVENT_TYPE = db.Column(db.String())
    SUB_EVENT_TYPE = db.Column(db.String())
    ACTOR1 = db.Column(db.String())
    LOCATION = db.Column(db.String())
    LATITUDE = db.Column(db.Float())
    LONGITUDE = db.Column(db.Float())
    SOURCE = db.Column(db.String())
    NOTES = db.Column(db.String())
    FATALITIES = db.Column(db.Integer())

    def __repr__(self):
        return '<Ukraine %r>' % (self.EVENT_TYPE)
