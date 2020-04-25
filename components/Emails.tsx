import React from "react";
import EmailPreview from "./EmailPreview";
import Email from "../types/EmailInterface";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {
  emails: Email[];
  onLoadMore(): void;
}

export default function Emails({ emails, onLoadMore }: IProps) {
  let prevs = emails.map((email, index) => (
    <EmailPreview email={email} key={index} />
  ));

  return (
    <InfiniteScroll
      dataLength={prevs.length * 3} //This is important field to render the next data
      next={onLoadMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // below props only if you need pull down functionality
      // refreshFunction={this.refresh}
      // pullDownToRefresh
      // pullDownToRefreshContent={
      //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      // }
      // releaseToRefreshContent={
      //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      // }
    >
      {prevs}
    </InfiniteScroll>
  );
}
