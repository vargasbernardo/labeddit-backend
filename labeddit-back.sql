-- Active: 1704906717292@@127.0.0.1@3306
 CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
 );

 INSERT INTO users (id, name, email, password )
 VALUES
    ('u001', 'Fulano', 'fulano@email.com', '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC'),
    ('u002', 'Beltrana', 'beltrana@email.com', '$2a$12$qPQj5Lm1dQK2auALLTC0dOWedtr/Th.aSFf3.pdK5jCmYelFrYadC'),
    ('u003', 'Astrodev', 'astrodev@email.com', '$2a$12$lHyD.hKs3JDGu2nIbBrxYujrnfIX5RW5oq/B41HCKf7TSaq9RgqJ.');

CREATE TABLE posts(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO posts (id, creator_id, content)
VALUES
    ('p001', 'u001', 'Qual super poder voce gostaria de ter?'),
    ('p002', 'u002', 'Porque os devs gostam de linux?'),
    ('p003', 'u002', '3 livros para levar para um ilha isolada?'),
    ('p004', 'u003', 'JS eh a melhor linguagem de programacao e eu posso provar!');

CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO comments (id, creator_id, post_id, content)
VALUES
    ('c001', 'u002', 'p001', 'Muito legal! Invisibilidade!'),
    ('c002', 'u001', 'p001', 'Ler mentes, com certeza!');

CREATE TABLE posts_likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO posts_likes_dislikes (user_id, post_id, like)
VALUES
    ('u001', 'p001', 1),
    ('u002', 'p001', 0);




CREATE TABLE comments_likes_dislikes (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO comments_likes_dislikes (user_id, comment_id, like)
VALUES
    ('u001', 'c001', 1),
    ('u002', 'c001', 0);


