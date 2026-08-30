// app/notes/filter/layout.tsx

type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesFilterLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <section>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesFilterLayout;
