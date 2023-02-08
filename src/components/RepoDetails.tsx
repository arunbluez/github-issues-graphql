import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  FaDumpsterFire,
  FaEye,
  FaGithubAlt,
  FaGlobeAmericas,
  FaStar,
} from "react-icons/fa";
import { REPO_DETAILS } from "../graphql/queries.graphql";
import { RepoDetailsQueryQuery } from "../graphql/__generated__/graphql.js";
import { useBoundStore } from "../stores/store";
import { formatNumber } from "../utils/generalUtils";

type Props = {
  data: RepoDetailsQueryQuery;
  owner: string;
};

export default function RepoDetails({ data, owner }: Props) {
  const [repoDetails, setRepoDetails] = useState(data);
  const repoName = useBoundStore((state) => state.repoName);
  const ownerName = useBoundStore((state) => state.ownerName);
  const [getReposDetailsQuery, { loading, error, data: newData }] =
    useLazyQuery(REPO_DETAILS);

  useEffect(() => {
    console.log(repoName, ownerName);
    if (repoName !== repoDetails.repository?.name || ownerName !== owner) {
      console.log(repoName, ownerName);
      getReposDetailsQuery({
        variables: {
          repoName: repoName,
          ownerName: ownerName,
        },
      });
    }
  }, [repoName, ownerName]);

  useEffect(() => {
    if (newData) {
      console.log(newData);
      setRepoDetails(newData);
    }
  }, [newData]);

  return (
    <div>
      <div className="stats stats-vertical shadow lg:stats-horizontal">
        <div className="stat max-w-max">
          <div className="stat-value flex items-center justify-between">
            <p className="text-black dark:text-white">
              {repoDetails.repository?.name}
            </p>
            <div className="flex gap-2 pl-4">
              <a href={repoDetails.repository?.url} target="_blank">
                <FaGithubAlt
                  size={24}
                  className="cursor-pointer text-secondary hover:text-white"
                />
              </a>
              {repoDetails.repository?.homepageUrl && (
                <a href={repoDetails.repository?.homepageUrl} target="_blank">
                  <FaGlobeAmericas
                    size={24}
                    className="cursor-pointer text-secondary hover:text-white"
                  />
                </a>
              )}
            </div>
          </div>
          <div className="mt-2 text-sm">
            {repoDetails.repository?.description}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaStar size={32} />
          </div>
          <div className="stat-title">Stars</div>
          <div className="stat-value text-3xl lg:text-5xl">
            {formatNumber(repoDetails.repository?.stargazers.totalCount!)}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaEye size={32} />
          </div>
          <div className="stat-title">Watchers</div>
          <div className="stat-value text-3xl lg:text-5xl">
            {formatNumber(repoDetails.repository?.watchers.totalCount!)}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDumpsterFire size={32} />
          </div>
          <div className="stat-title">Issues</div>
          <div className="stat-value text-3xl lg:text-5xl">
            {formatNumber(repoDetails.repository?.issues.totalCount!)}
          </div>
        </div>
      </div>
    </div>
  );
}
