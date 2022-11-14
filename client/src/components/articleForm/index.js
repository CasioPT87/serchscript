const React = require("react");
const { useState } = require("react");
const ArticleCreator = require("../articleCreator");

function articleForm() {
  const [title, setTitle] = useState("this is a fake title");
  const [description, setDescription] = useState("this is a fake description");
  const [content, setContent] = useState("this is a fake content");
  const [hidden, setHidden] = useState(false);
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        content,
        hidden,
      };
      let res = await fetch("http://localhost:8880/data/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Connection: "keep-alive",
          Accept: "*/*",
        },
        body: new URLSearchParams(payload),
      });
      if (res.status === 200) {
        const resJson = await res.json();
        console.log(resJson);
        setTitle("");
        setDescription("");
        setContent("");
        setMessage("Articulo creado bien, bien, BIEN!!!!");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ArticleCreator />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

module.exports = articleForm;
