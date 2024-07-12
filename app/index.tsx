import { styled } from "nativewind";
import { ActivityIndicator, Text, View } from "react-native";
const StyledView = styled(View)
const StyledText = styled(Text)
export default function StartPage() {
  return (
    <StyledView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className='bg-slate-400'
    >
      <ActivityIndicator size='large' color={'black'}></ActivityIndicator>
    </StyledView>
  );
}
