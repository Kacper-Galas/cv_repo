import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

import styles from "./index.module.scss";

export const Burger = ({ isOpen, toggle }) => {
  const Icon = isOpen ? FiX : FiMenu;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOpen ? "x" : "menu"}
        className={styles.burgerWrapper}
        onClick={toggle} // ← przeniesione tutaj
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.1 }}
      >
        <Icon size={30} />
      </motion.div>
    </AnimatePresence>
  );
};