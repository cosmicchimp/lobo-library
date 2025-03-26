import Octicons from "@expo/vector-icons/Octicons";

export const icon = {
  index: function(props) {
    return <Octicons name="home" size={24} {...props} />;
  },
  searchpage: function(props) {
    return <Octicons name="search" size={24} {...props} />;
  },
  profilepage: function(props) {
    return <Octicons name="person" size={24} {...props} />;
  }
}; 