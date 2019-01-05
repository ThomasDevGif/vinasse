CREATE TABLE wine
(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  preservationTime INT NOT NULL,
  designation VARCHAR(50) NOT NULL,
  producer VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  comment VARCHAR(100)
);
