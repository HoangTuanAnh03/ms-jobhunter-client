// 'use client'
import { websites } from "@/lib/data";
// import { useState } from 'react'

export default function LoginPage() {
  return (
    <div>
      Login page
      <ul>
        {websites.map((item) => {
          return (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
