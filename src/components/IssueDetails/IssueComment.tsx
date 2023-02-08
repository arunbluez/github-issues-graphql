import React from "react";
import TimeAgo from "react-timeago";
import parse from "html-react-parser";

type Props = {
  username: string;
  date: Date;
  content: string;
};

export default function IssueComment({ username, date, content }: Props) {
  const html =
    '<h2 dir="auto">Summary</h2>\n<p dir="auto">A new error occurred in production builds using <code class="notranslate">zustand@4.3.2</code> and <a href="https://github.com/parcel-bundler/parcel"><code class="notranslate">parcel</code></a>. This error does not occur in <code class="notranslate">zustand@4.3.1</code> and is probably related to <a aria-label="Pull request #1531" class="issue-link js-issue-link" data-error-text="Failed to load title" data-id="1528392346" data-permission-text="Title is private" data-url="https://github.com/pmndrs/zustand/issues/1531" data-hovercard-type="pull_request" data-hovercard-url="/pmndrs/zustand/pull/1531/hovercard" href="https://github.com/pmndrs/zustand/pull/1531">#1531</a>.</p>\n<p dir="auto">The following error is displayed in the console when serving a production build:</p>\n<div class="snippet-clipboard-content notranslate position-relative overflow-auto" data-snippet-clipboard-copy-content="Uncaught TypeError: (0 , i.create) is not a function\n    at app.js:3:22"><pre class="notranslate"><code class="notranslate">Uncaught TypeError: (0 , i.create) is not a function\n    at app.js:3:22\n</code></pre></div>\n<p dir="auto">Development server works fine.</p>\n<p dir="auto">This issue is similar to <a aria-label="Issue #1475" class="issue-link js-issue-link" data-error-text="Failed to load title" data-id="1487391794" data-permission-text="Title is private" data-url="https://github.com/pmndrs/zustand/issues/1475" data-hovercard-type="issue" data-hovercard-url="/pmndrs/zustand/issues/1475/hovercard" href="https://github.com/pmndrs/zustand/issues/1475">#1475</a>.</p>\n<h2 dir="auto">Link to reproduction</h2>\n<p dir="auto"><a href="https://github.com/nicobohne/zustand-parcel-reproduction">https://github.com/nicobohne/zustand-parcel-reproduction</a><br>\n<a href="https://codesandbox.io/p/github/nicobohne/zustand-parcel-reproduction/main" rel="nofollow">https://codesandbox.io/p/github/nicobohne/zustand-parcel-reproduction/main</a></p>\n<h2 dir="auto">Check List</h2>\n<p dir="auto">Please do not ask questions in issues.</p>\n<ul class="contains-task-list">\n<li class="task-list-item"><input type="checkbox" id="" disabled="" class="task-list-item-checkbox" checked=""> I\'ve already opened a <a href="https://github.com/pmndrs/zustand/discussions">discussion</a> before opening this issue, or already discussed in other media.</li>\n</ul>\n<p dir="auto">Please include a minimal reproduction.</p>\n<ul class="contains-task-list">\n<li class="task-list-item"><input type="checkbox" id="" disabled="" class="task-list-item-checkbox" checked=""> I\'ve added a link to a <a href="https://www.typescriptlang.org/play" rel="nofollow">typescript playground</a> or <a href="https://codesandbox.io" rel="nofollow">codesandbox</a> with a minimal reproduction.</li>\n</ul>';
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-500">
      <div className="bg-gray-700 px-4 py-2">
        <span className="mr-2 font-bold">{username}</span>
        <span>
          commented <TimeAgo date={date} />
        </span>
      </div>
      <div className="p-4">
        <p>{parse(html)}</p>
      </div>
    </div>
  );
}
