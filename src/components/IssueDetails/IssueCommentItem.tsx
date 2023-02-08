import React from "react";
import TimeAgo from "react-timeago";
import parse from "html-react-parser";
import { User } from "../../graphql/__generated__/graphql";
import { FaLaptopCode } from "react-icons/fa";

type Props = {
  isLoading: boolean;
  user: User;
  date: Date;
  content: string;
  isOriginalPoster?: boolean;
  isHtml?: boolean;
};

export default function IssueCommentItem({
  isLoading,
  user,
  date,
  content,
  isOriginalPoster = false,
  isHtml = false,
}: Props) {
  const LoadingItem = () => (
    <div className="w-full overflow-hidden rounded-xl border border-gray-500">
      <div className="bg-gray-700 px-4 py-2">
        <div className="h-8 w-4/6 animate-pulse rounded-xl bg-gray-600"></div>
      </div>
      <div className="p-4">
        <div className="h-8 w-full animate-pulse rounded-xl bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-600"></div>
        <div className="h-4 w-full animate-pulse rounded-xl bg-gray-600"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingItem />;
  }

  return (
    <div className="mb-2 w-full overflow-hidden rounded-xl border border-gray-500">
      <div className="flex items-center justify-between bg-gray-700 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-secondary ring-offset-2 ring-offset-base-100">
              <img src={user.avatarUrl} />
            </div>
          </div>
          <span className="font-bold">{user.name}</span>
          <span>
            commented <TimeAgo date={date} />
          </span>
        </div>
        {isOriginalPoster && (
          <div className="flex items-center gap-2">
            <FaLaptopCode size={24} />
            <span>Issue Creator</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {isHtml ? (
          parse(content)
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
    </div>
  );
}
