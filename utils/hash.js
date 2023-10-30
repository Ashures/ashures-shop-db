import argon2 from "argon2";

const hash = async (input) => {
  return await argon2.hash(input);
};

export default hash;