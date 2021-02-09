INSERT INTO qanda.products (id, name, seller, price, rating, product_code) VALUES (1, 'shoes', 'vans', 33.55, 4.9, 123456789)
INSERT INTO qanda.products (id, name, seller, price, rating, product_code) VALUES (2, 'shoes', 'vans', 33.55, 4.9, 123456789)
GO

INSERT INTO qanda.questions (id, username, asked_at, question, product_id) VALUES (1, 'aikie', '2011-10-11', 'Why is moon round?', 1)
INSERT INTO qanda.questions (id, username, asked_at, question, product_id) VALUES (2, 'aikie', '2011-10-11', 'Why is moon round?', 2)
GO

INSERT INTO qanda.answers (id, username, answered_at, answer, question_id) VALUES (1, 'wumby', '2011-10-12', 'Because the moon is a plate', 1)
INSERT INTO qanda.answers (id, username, answered_at, answer, question_id) VALUES (2, 'wumby', '2011-10-12', 'Because the moon is a plate', 2)
GO