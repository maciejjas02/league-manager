from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from database import Base

class RoleEnum(str, enum.Enum):
    admin = "admin"
    referee = "referee"
    player = "player"
    fan = "fan"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.fan)

    referee_profile = relationship("RefereeProfile", back_populates="user", uselist=False)

class RefereeProfile(Base):
    __tablename__ = "referee_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    license_level = Column(String, default="Amator")  # PRO, Elite, Amator
    experience_points = Column(Integer, default=10)   # 1-100pkt systemu eksperckiego
    is_available = Column(Boolean, default=True)

    user = relationship("User", back_populates="referee_profile")
    matches = relationship("Match", back_populates="referee")

class League(Base):
    __tablename__ = "leagues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    division = Column(Integer, default=1)

    standings = relationship("LeagueStanding", back_populates="league")
    matches = relationship("Match", back_populates="league")

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    global_elo = Column(Float, default=1500.0)
    fair_play_index = Column(Float, default=100.0)
    preferred_time_slot = Column(String, nullable=True)

    players = relationship("Player", back_populates="team")
    standings = relationship("LeagueStanding", back_populates="team")

class LeagueStanding(Base):
    __tablename__ = "league_standings"

    id = Column(Integer, primary_key=True, index=True)
    league_id = Column(Integer, ForeignKey("leagues.id"))
    team_id = Column(Integer, ForeignKey("teams.id"))

    matches_played = Column(Integer, default=0)
    wins = Column(Integer, default=0)
    draws = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    goals_for = Column(Integer, default=0)
    goals_against = Column(Integer, default=0)
    points = Column(Integer, default=0)

    league = relationship("League", back_populates="standings")
    team = relationship("Team", back_populates="standings")

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    position = Column(String, default="Zawodnik z pola")
    is_suspended = Column(Boolean, default=False)

    team = relationship("Team", back_populates="players")
    stats = relationship("MatchPlayerStats", back_populates="player")

class Pitch(Base):
    __tablename__ = "pitches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    surface_type = Column(String, default="Sztuczna trawa")

    matches = relationship("Match", back_populates="pitch")

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    league_id = Column(Integer, ForeignKey("leagues.id"))
    matchday = Column(Integer, nullable=False)

    home_team_id = Column(Integer, ForeignKey("teams.id"))
    away_team_id = Column(Integer, ForeignKey("teams.id"))
    pitch_id = Column(Integer, ForeignKey("pitches.id"), nullable=True)
    referee_id = Column(Integer, ForeignKey("referee_profiles.id"), nullable=True)

    match_date = Column(String, nullable=True) # YYYY-MM-DD
    time_slot = Column(String, nullable=True)  # gg:mm
    is_manually_edited = Column(Boolean, default=False)

    temperature_score = Column(Float, default=20.0) #0-100
    home_score = Column(Integer, nullable=True)
    away_score = Column(Integer, nullable=True)
    status = Column(String, default="Zaplanowany") # Zaplanowany, Zakończony, Przełożony

    league = relationship("League", back_populates="matches")
    pitch = relationship("Pitch", back_populates="matches")
    referee = relationship("RefereeProfile", back_populates="matches")
    player_stats = relationship("MatchPlayerStats", back_populates="match")
    report = relationship("MatchReport", back_populates="match", uselist=False)

class TeamConflict(Base):
    __tablename__ = "team_conflicts"

    id = Column(Integer, primary_key=True, index=True)
    team_a_id = Column(Integer, ForeignKey("teams.id"))
    team_b_id = Column(Integer, ForeignKey("teams.id"))
    conflict_score = Column(Float, default=50.0) # 0-100
    reason = Column(String, nullable=True)       # np. "bojka w sezonie zimowym 2025

class MatchPlayerStats(Base):
    __tablename__ = "match_player_stats"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    player_id = Column(Integer, ForeignKey("players.id"))

    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)
    minutes_played = Column(Integer, default=0) # max50
    is_mvp = Column(Boolean, default=False)
    match_rating = Column(Float, default=6.0)   # 1-10

    is_anomaly_flagged = Column(Boolean, default=False)
    anomaly_confidence = Column(Float, default=0.0) # Pewność algorytmu w %
    anomaly_reason = Column(String, nullable=True)
    admin_status = Column(String, default="Brak")   # Brak, Oczekuje, Zatwierdzony, Gracz na lewo

    match = relationship("Match", back_populates="player_stats")
    player = relationship("Player", back_populates="stats")

class MatchReport(Base):
    __tablename__ = "match_reports"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"), unique=True)
    referee_id = Column(Integer, ForeignKey("referee_profiles.id"))

    referee_notes = Column(Text, nullable=True)
    generated_article = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    match = relationship("Match", back_populates="report")