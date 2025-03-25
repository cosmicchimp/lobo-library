import Octicons from "@expo/vector-icons/Octicons";

export const icon = {
  home: function(props) {
    return <Octicons name="home" size={24} {...props} />;
  },
  search: function(props) {
    return <Octicons name="search" size={24} {...props} />;
  },
  profile: function(props) {
    return <Octicons name="person" size={24} {...props} />;
  }
};
