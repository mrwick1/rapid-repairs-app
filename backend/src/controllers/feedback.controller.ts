import { Request, Response } from "express";
import connection from "../db/connection";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";

export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const db = await connection();
    const [rows] = await db.query("SELECT * FROM feedback");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFeedback = async (req: Request, res: Response) => {
  const { feedback, star_rating, service_provider_id, job_id, token } =
    req.body;
  const db = await connection();
  try {
    await db.beginTransaction();

    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);

    const customer_id = tokenValid["user_id"];

    const [checkUser] = await db.query(
      "SELECT * FROM service_provider_details WHERE user_id = ?",
      [service_provider_id]
    );

    if (checkUser[0] === undefined) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const [result] = await db.execute(
      "INSERT INTO feedback (feedback, star_rating, service_provider_id, customer_id, job_id) VALUES (?, ?, ?, ?)",
      [feedback, star_rating, service_provider_id, customer_id, job_id]
    );

    const [rating] = await db.query(
      `SELECT
        SUM(star_rating) AS total_star_rating,
        COUNT(*) AS total_count
        FROM
        feedback
        WHERE
        user_id = ?
        `,
      [service_provider_id]
    );

    const average_rating = rating[0].total_star_rating / rating[0].total_count;

    const [updateRating] = await db.execute(
      "UPDATE service_provider_details set average_rating = ? where user_id = ?",
      [average_rating, service_provider_id]
    );

    db.commit();

    res.json({ message: "Feedback added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFeedbackByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { feedback, star_rating } = req.body;

  try {
    const db = await connection();
    const [result] = await db.execute<mysql.ResultSetHeader>(
      "UPDATE feedback SET feedback = ?, star_rating = ? WHERE user_id = ?",
      [feedback, star_rating, userId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Feedback not found" });
    } else {
      res.json({ message: "Feedback updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFeedbackByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const db = await connection();
    const [result] = await db.execute<mysql.ResultSetHeader>(
      "DELETE FROM feedback WHERE user_id = ?",
      [userId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Feedback not found" });
    } else {
      res.json({ message: "Feedback deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeedbackByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const db = await connection();
    const [rows] = await db.query("SELECT * FROM feedback WHERE user_id = ?", [
      userId,
    ]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
