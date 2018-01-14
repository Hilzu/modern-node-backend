const notFound = (req, res) => {
  res.status(404).json({ error: { message: "Path not found", status: 404 } });
};

export default notFound;
