import React from "react";
import {GetProp, Input} from "antd";

const EditNameModalContent = React.memo((props: {
  onChanged: GetProp<typeof Input, 'onChange'>;
  title: string;
}) => {
  const {onChanged, title} = props;

  return (
    <Input
      onChange={onChanged}
      placeholder="请输入标题"
      defaultValue={title}
    />
  );
});

export default EditNameModalContent;