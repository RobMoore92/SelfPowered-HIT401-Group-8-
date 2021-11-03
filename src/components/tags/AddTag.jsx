import { IonCard, IonText, IonTitle } from "@ionic/react";
import { book, warningSharp } from "ionicons/icons";
import Popover from "../containers/Popover/Popover";
import Tag from "./Tag";

const tags = [
  {
    id: "1",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "2",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "1",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "2",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "3",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "4",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "5",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "6",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
  {
    id: "7",
    name: "Important",
    icon: warningSharp,
    chipColor: "bg-gray-200",
    iconColor: "text-red-600",
  },
  {
    id: "8",
    name: "Research",
    icon: book,
    chipColor: "bg-gray-200",
    iconColor: "text-blue-500",
  },
];

export default (props) => {
  return (
    <Popover {...props}>
      <IonText className="text-2xl">Available Tags</IonText>
      <div className="mt-4">
        {tags.map((tag) => {
          return <Tag {...tag} />;
        })}
      </div>
    </Popover>
  );
};
