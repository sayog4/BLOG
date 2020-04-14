const signOut = (req, res) => {
  if (res.method === "GET") {
    res.removeHeader("Cookie");
    res.json({
      message: "Successfully sign out!"
    });
  }
};

export default signOut;
