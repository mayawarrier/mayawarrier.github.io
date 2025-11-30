import { LucideIcon } from "lucide-react"

export type ProjectTileProps = React.PropsWithChildren<{
  title: string;
  imageUrl?: string;
  tileClickUrl: string;
  extLinks: {
    label: string;
    icon: LucideIcon;
    url?: string;
  }[];
}>;

export interface ProjectTileFC extends React.FC<ProjectTileProps> {
  DescList: React.FC<{
    title: string;
    items: string[];
    /** Use dangerouslySetInnerHTML */
    renderHTML?: boolean;
  }>;
  Desc: React.FC<{
    text: string;
  }>;
}

export const ProjectTile: ProjectTileFC = (props) => {
  return (
    <>
      <div className="flex flex-col">
        {/* content */}
        <div
          onClick={() => window.open(props.tileClickUrl, "_self")}
          className="flex flex-col space-y-4 group peer px-2 pt-2 lg:px-3 lg:pt-3 pb-9
              hover:bg-muted/60 hover:cursor-pointer transition-colors rounded-lg"
        >
          {props.imageUrl && (
            <img
              src={props.imageUrl}
              className="w-full h-48 object-cover object-center rounded-md" />
          )}

          <div className="flex flex-row gap-2 justify-between p-1">
            {/* text */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg lg:text-xl font-medium 
                  text-foreground group-hover:text-primary transition-colors">
                {props.title}
              </h3>
              <div className="space-y-4 max-w-3xl xl:max-w-208">
                {props.children}
              </div>
            </div>

            {/* links */}
            <div className="flex flex-row items-start gap-2 text-sm">
              {props.extLinks.map((obj, idx) => {
                if (!obj.url) {
                  return null;
                }
                const Icon = obj.icon;
                return (
                  <a
                    key={idx}
                    href={obj.url}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-row items-center justify-center gap-1 py-1 px-2
                        text-muted-foreground border-muted-foreground/30 border-1 rounded-md 
                        hover:text-accent hover:border-accent transition-colors">
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:block">{obj.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="px-2 mb-6 peer-hover:invisible">
          <div className="h-px bg-muted-foreground/15" />
        </div>
      </div>
    </>
  );
};

ProjectTile.DescList = (props) => {
  return (
    <div className="space-y-2">
      <div className="font-medium text-muted-foreground/80">
        {props.title}
      </div>
      <ul className="list-disc pl-6 text-muted-foreground/80 [&_a]:underline [&_a]:text-accent
        group-hover:text-foreground/60 group-hover:[&_a]:text-primary/80 transition-colors">
        {props.items.map((desc, descIdx) => {
          if (props.renderHTML === true) {
            return <li key={descIdx} dangerouslySetInnerHTML={{ __html: desc }} />;
          } else {
            return <li key={descIdx}>{desc}</li>;
          }
        })}
      </ul>
    </div>
  );
};

ProjectTile.Desc = (props) => {
  return (
    <p className={`text-muted-foreground/80 [&_a]:underline [&_a]:text-accent
        group-hover:text-foreground/60 group-hover:[&_a]:text-primary/80 transition-colors`}>
      {props.text}
    </p>
  );
};