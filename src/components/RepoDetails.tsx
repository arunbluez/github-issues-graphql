import React from "react";
import {
  FaDumpsterFire,
  FaEye,
  FaGithubAlt,
  FaGlobeAmericas,
  FaStar,
} from "react-icons/fa";
import { RepoDetailsQueryQuery } from "../graphql/__generated__/graphql.js";

type Props = {
  data: RepoDetailsQueryQuery;
};

export default function RepoDetails({ data }: Props) {
  return (
    <div>
      <div className="stats shadow">
        <div className="stat max-w-xs">
          <div className="stat-value flex items-center justify-between">
            <p className="text-black dark:text-white">
              {data.repository?.name}
            </p>
            <div className="flex gap-2">
              <a href={data.repository?.url} target="_blank">
                <FaGithubAlt
                  size={24}
                  className="cursor-pointer text-secondary hover:text-white"
                />
              </a>
              <a href={data.repository?.homepageUrl} target="_blank">
                <FaGlobeAmericas
                  size={24}
                  className="cursor-pointer text-secondary hover:text-white"
                />
              </a>
            </div>
          </div>
          <div className="mt-2 text-sm">{data.repository?.description}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaStar size={32} />
          </div>
          <div className="stat-title">Stars</div>
          <div className="stat-value text-5xl">
            {data.repository?.stargazers.totalCount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaEye size={32} />
          </div>
          <div className="stat-title">Watchers</div>
          <div className="stat-value text-5xl">
            {data.repository?.watchers.totalCount}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDumpsterFire size={32} />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value text-5xl">
            {data.repository?.issues.totalCount}
          </div>
        </div>
      </div>
    </div>
  );
}
