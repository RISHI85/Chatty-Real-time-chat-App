

import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  console.log("generate token triggered");
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  console.log(token);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 15,
    sameSite: "None",     // 👈 Required for cross-site cookies
    secure: true          // 👈 Required for HTTPS (like Render & Vercel)
  });
  return token;
};
