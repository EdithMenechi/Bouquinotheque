CREATE TABLE formats (
    id SERIAL PRIMARY KEY,
    format VARCHAR(50) NOT NULL
);
CREATE TABLE rangements (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    utilisateur_id INT REFERENCES utilisateurs(id) ON DELETE CASCADE
);
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    sous_titre VARCHAR(255),
    tome INT,
    format_id INT REFERENCES formats(id),
    isbn VARCHAR(20) UNIQUE,
    couverture VARCHAR(255),
    nb_pages INT
);
CREATE TABLE auteurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);
CREATE TABLE livres_auteurs (
    livre_id INT REFERENCES livres(id) ON DELETE CASCADE,
    auteur_id INT REFERENCES auteurs(id) ON DELETE CASCADE,
    PRIMARY KEY (livre_id, auteur_id)
);
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    mot_de_passe VARCHAR(255)
);
CREATE TABLE utilisateurs_livres (
    utilisateur_id INT REFERENCES utilisateurs(id) ON DELETE CASCADE,
    livre_id INT REFERENCES livres(id) ON DELETE CASCADE,
    rangement_id INT REFERENCES rangements(id) ON DELETE
    SET NULL DEFAULT NULL,
        commentaire_livre TEXT,
        PRIMARY KEY (utilisateur_id, livre_id)
);