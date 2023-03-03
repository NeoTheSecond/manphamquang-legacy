import Image from "next/image";
import React, { ReactElement } from "react";

const TableHead = ({ children }: { children?: string }) => (
  <th className="p-2 border-b border-slate-300">{children}</th>
);

const TableData = ({ children }: { children: string | ReactElement }) => (
  <td className="p-2 border-b border-slate-300">{children}</td>
);

const data = [
  {
    title: "How I build my website",
    type: "technical",
    duration: "5 min",
    postedOn: "03/03/2023",
  },
  {
    title: "How I build a better portfolio",
    type: "fun",
    duration: "10 min",
    postedOn: "10/03/2023",
  },
  {
    title: "Practicing guitar is fun",
    type: "fun",
    duration: "3 min",
    postedOn: "24/04/2023",
  },
];

export default function Blogs() {
  return (
    <div>
      <h1 className="text-4xl">Blogs</h1>
      <p>Where I write stuff</p>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>duration</TableHead>
            <TableHead>posted on</TableHead>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.title} className="cursor-pointer hover:bg-slate-200">
              <TableData>
                <Image
                  src="/portrait.jpg"
                  width={50}
                  height={30}
                  alt="Portrait of me"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/portrait.jpg"
                  className="rounded-sm"
                />
              </TableData>
              <TableData>{row.title}</TableData>
              <TableData>{row.type}</TableData>
              <TableData>{row.duration}</TableData>
              <TableData>{row.postedOn}</TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
