const categories = [
  "Notebooks & PCs",
  "Hardware",
  "Periféricos",
  "Monitores & Telas",
  "Acessórios & Upgrades",
  "Gaming",
];

export default function CategoryBar() {
  return (
    <div className="categoryBar">
      <div className="container categoryRow">
        {categories.map((c) => (
          <button key={c} className="catBtn">
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
