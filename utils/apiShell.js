const apiShell = async (res, body) => {
  try {
    return await body();
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export default apiShell;