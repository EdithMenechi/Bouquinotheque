CREATE TABLE formats (
    id SERIAL PRIMARY KEY,
    format VARCHAR(255) NOT NULL
);
CREATE TABLE rangements (
    id SERIAL PRIMARY KEY,
    rangement VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    sous_titre VARCHAR(255),
    tome VARCHAR(50),
    format_id INT REFERENCES formats(id),
    rangement_id INT REFERENCES rangements(id),
    isbn VARCHAR(20) UNIQUE
);
CREATE TABLE auteurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);
CREATE TABLE livres_auteurs (
    id_livre INT REFERENCES livres(id) ON DELETE CASCADE,
    id_auteur INT REFERENCES auteurs(id) ON DELETE CASCADE,
    PRIMARY KEY (id_livre, id_auteur)
);