CREATE SCHEMA qanda
GO

CREATE TABLE qanda.products (
  id INT NOT NULL,
  name VARCHAR(50),
  seller VARCHAR(50),
  price DECIMAL(18,2),
  rating DECIMAL(5,1),
  product_code NUMERIC(18,0),
  CONSTRAINT PK_products_productID PRIMARY KEY CLUSTERED (id),
)
GO

CREATE TABLE qanda.questions (
  id INT NOT NULL,
  username VARCHAR(40),
  asked_at DATETIME,
  question NVARCHAR(300),
  product_id INT,
  CONSTRAINT PK_questions_questionID PRIMARY KEY CLUSTERED (id),
  CONSTRAINT FK_questions_productID FOREIGN KEY (product_id) REFERENCES qanda.products (id)
)
GO

CREATE TABLE qanda.answers (
  id INT NOT NULL,
  username VARCHAR(40),
  answered_at DATETIME,
  answer NVARCHAR(300),
  question_id INT,
  CONSTRAINT PK_answers_answerID PRIMARY KEY CLUSTERED (id),
  CONSTRAINT FK_answers_questionID FOREIGN KEY(question_id) REFERENCES qanda.questions (id)
)
GO

CREATE TABLE qanda.votes (
  id INT NOT NULL,
  username VARCHAR(40),
  voted_at DATETIME,
  helpful INT,
  answer_id INT,
  CONSTRAINT PK_votes_voteID PRIMARY KEY CLUSTERED (id),
  CONSTRAINT PK_votes_answerID FOREIGN KEY (answer_id) REFERENCES qanda.answers (id)
)
GO

CREATE TABLE qanda.reports (
  id INT NOT NULL,
  username VARCHAR(40),
  reported_at DATETIME,
  answer_id INT,
  CONSTRAINT PK_reports_reportID PRIMARY KEY CLUSTERED (id),
  CONSTRAINT PK_reports_answerID FOREIGN KEY (answer_id) REFERENCES qanda.answers (id)
)
GO