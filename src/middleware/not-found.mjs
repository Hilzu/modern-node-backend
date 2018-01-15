const notFound = (req, res) => {
  res.status(404).json({
    error: { message: "Path not found", name: "NotFound", status: 404 },
  });
};

export default notFound;
