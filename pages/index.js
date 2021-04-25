import {
  Page,
  Card,
  Text,
  Image,
  Input,
  ButtonGroup,
  Avatar,
  Grid,
  Button,
} from "@geist-ui/react";
import { Terminal } from "@geist-ui/react-icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import data from "../final.json";
import rehypeRaw from "rehype-raw";
const parse = require("parse-markdown-links");

const formatLinks = (source) => {
  const reUrl = /([^\[\(])(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}[-a-zA-Z0-9@:%_\+.~#?&//=]*)([^\]\)])/g;
  return source.replace(reUrl, "$1[$2]($2)$3");
};

function CardItem({ x }) {
  let item = data[x];
  if (item.contributors.length == 0) {
    console.log(item);
  }
  const [open, setOpen] = useState(false);
  return (
    <Card
      style={{
        borderRadius: x != 0 ? "0px" : "",
        borderBottomLeftRadius: x != 99 ? "0px" : "5px",
        borderBottomRightRadius: x != 99 ? "0px" : "5px",
        borderTop: x != 0 ? "none" : "",
      }}
    >
      <Grid.Container
        gap={0}
        justify="center"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <Grid xs style={{ alignItems: "center" }}>
          {" "}
          <p style={{ marginBlockStart: "0em", marginBlockEnd: "0em" }}>
            <Avatar
              src={`_next/image?url=${
                typeof item.contributors[3] != "undefined"
                  ? `https://github.com/${item.contributors[3][0]}.png`
                  : `http://identicon.rmhdev.net/${item.name}3.png`
              }&w=32&q=75`}
              loading="lazy"
              alt={`${
                typeof item.contributors[3] != "undefined"
                  ? item.contributors[3][0]
                  : `Unknown`
              }'s profile picture`}
              stacked
            />
            <Avatar
              src={`_next/image?url=${
                typeof item.contributors[2] != "undefined"
                  ? `https://github.com/${item.contributors[2][0]}.png`
                  : `http://identicon.rmhdev.net/${item.name}2.png`
              }&w=32&q=75`}
              alt={`${
                typeof item.contributors[2] != "undefined"
                  ? item.contributors[2][0]
                  : `Unknown`
              }'s profile picture`}
              loading="lazy"
              stacked
            />
            <Avatar
              src={`_next/image?url=${
                typeof item.contributors[1] != "undefined"
                  ? `https://github.com/${item.contributors[1][0]}.png`
                  : `http://identicon.rmhdev.net/${item.name}1.png`
              }&w=32&q=75`}
              alt={`${
                typeof item.contributors[1] != "undefined"
                  ? item.contributors[1][0]
                  : `Unknown`
              }'s profile picture`}
              loading="lazy"
              stacked
            />
            <Avatar
              src={`_next/image?url=${`https://github.com/${item.contributors[0][0]}.png`}&w=32&q=75`}
              loading="lazy"
              alt={`${item.contributors[0][0]}'s profile picture`}
              stacked
            />
            <b style={{ marginLeft: "12px" }}>{item.name}</b>
          </p>
        </Grid>
        <Grid xs style={{ textAlign: "right" }}>
          <ButtonGroup
            ghost
            type="success"
            style={{ marginLeft: "auto" }}
            size="small"
          >
            <Button size="small">
              {" "}
              <Terminal size={16} className="icon-next-app" />{" "}
              <span style={{ marginRight: "4px" }}></span>
              Use Create Next App
            </Button>
            <Button
              size="small"
              onClick={() =>
                (window.location = parse(item.description).filter((word) =>
                  word.includes("https://vercel.com/new/git/external")
                )[0])
              }
            >
              ▲ <span style={{ marginRight: "6px" }}></span>Deploy to Vercel
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid.Container>
      {open ? (
        <p className="markdown-body">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {formatLinks(item.description)
              .replace(/(!\[.*?\]\()(.+?)(\))/g, function (whole, a, b, c) {
                return (
                  a +
                  (b.includes("http")
                    ? ""
                    : `https://github.com/vercel/next.js/raw/canary/examples/${item.name}/`) +
                  b.replace("./", "") +
                  c
                );
              })
              .replace("## Deploy your own", '<h2 class="deploy-header"></h2>')
              .replace(
                "Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).",
                ""
              )}
          </ReactMarkdown>
        </p>
      ) : (
        ""
      )}
    </Card>
  );
}

export default function Home() {
  console.log(data.length);
  return (
    <Page dotBackdrop>
      <Page.Header>
        <Text h1 style={{ fontWeight: "600", textAlign: "center" }}>
          {" "}
          Get Building with These{" "}
          <div
            style={{
              width: "1em",
              height: "1em",
              marginRight: "0em",
              display: "inline-block",
              verticalAlign: "text-top",
            }}
          >
            <Image
              src="https://cloud-e7ooedfti-hack-club-bot.vercel.app/0nextjs-icon-dark.png"
              style={{ height: "1em", display: "inline-block", width: "1em" }}
            />
          </div>
          <span style={{ fontWeight: "800" }}> Next.js</span> Starters
        </Text>
      </Page.Header>
      <div style={{ marginBottom: "8px", marginTop: "24px" }}>
        <Input
          size="large"
          placeholder="Search Starters"
          width="100%"
          style={{ margin: "8pt 8pt" }}
        />
      </div>
      {data.map((item, index) => (
        <CardItem x={index} item={item} />
      ))}
      <style>
        {`
      .content{
        padding: 8pt 8pt!important
      }
      .icon-next-app{
      transform: translateY(1px)
      }
      .avatar-group{
        display: inline-flex!important;
      }
      .markdown-body img{
        width: fit-content!important;
      }
      .markdown-body h1, h2, h3, h4, h5, h6{
        font-size: 1.3em;
        font-weight: 600;
      }
      .deploy-header{
        display: none;
      }
      .deploy-header + p{
        display: none;
      }
      .deploy-header + p + p{
        display: none;
      }
      .markdown-body h1:first-child {
        display: none;
    }
      `}
      </style>
    </Page>
  );
}
