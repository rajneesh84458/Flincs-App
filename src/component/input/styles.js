import { StyleSheet } from "react-native";
import { appStyle } from "../../utility";

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    backgroundColor:'white',
    width: "90%",
    color:"#005792" ,
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16
  },
});
