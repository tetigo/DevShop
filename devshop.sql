-- MySQL Script generated by MySQL Workbench
-- 09/20/19 15:00:55
-- Model: New Model    Version: 1.0
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema devshop
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `devshop` ;
CREATE SCHEMA IF NOT EXISTS `devshop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `devshop` ;

-- -----------------------------------------------------
-- Table `devshop`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`products` ;

CREATE TABLE IF NOT EXISTS `devshop`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`product_variations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`product_variations` ;

CREATE TABLE IF NOT EXISTS `devshop`.`product_variations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(245) NULL,
  `available` INT NULL,
  `variation_name` VARCHAR(245) NULL,
  `price` FLOAT NULL,
  `price_from` FLOAT NULL,
  `weight` INT NULL,
  `order` INT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_variations_products_idx` (`product_id` ASC),
  CONSTRAINT `fk_product_variations_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `devshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`product_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`product_images` ;

CREATE TABLE IF NOT EXISTS `devshop`.`product_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(245) NULL,
  `url` VARCHAR(245) NULL,
  `order` INT NULL,
  `product_variation_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_images_product_variations1_idx` (`product_variation_id` ASC),
  CONSTRAINT `fk_product_images_product_variations1`
    FOREIGN KEY (`product_variation_id`)
    REFERENCES `devshop`.`product_variations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`categories` ;

CREATE TABLE IF NOT EXISTS `devshop`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`products_has_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`products_has_categories` ;

CREATE TABLE IF NOT EXISTS `devshop`.`products_has_categories` (
  `products_id` INT NOT NULL,
  `categories_id` INT NOT NULL,
  PRIMARY KEY (`products_id`, `categories_id`),
  INDEX `fk_products_has_categories_categories1_idx` (`categories_id` ASC),
  INDEX `fk_products_has_categories_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_products_has_categories_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `devshop`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_categories_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `devshop`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banner_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`banner_types` ;

CREATE TABLE IF NOT EXISTS `devshop`.`banner_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `banner_type` VARCHAR(245) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banners`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `devshop`.`banners` ;

CREATE TABLE IF NOT EXISTS `devshop`.`banners` (
  `idbanners` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(245) NULL,
  `banner_type_id` INT NOT NULL,
  `url` VARCHAR(245) NULL,
  `order` INT NULL,
  `image_url` VARCHAR(245) NULL,
  PRIMARY KEY (`idbanners`),
  INDEX `fk_banners_banner_types1_idx` (`banner_type_id` ASC),
  CONSTRAINT `fk_banners_banner_types1`
    FOREIGN KEY (`banner_type_id`)
    REFERENCES `devshop`.`banner_types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
