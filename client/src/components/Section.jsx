export default function Section({ title, actionText, children }) {
  return (
    <div className="section">
      <div className="sectionHead">
        <h2>{title}</h2>
        {actionText ? <a className="sectionAction" href="#">{actionText}</a> : null}
      </div>
      {children}
    </div>
  );
}
