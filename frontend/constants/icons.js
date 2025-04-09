import Octicons from "@expo/vector-icons/Octicons";
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const redColor = "#007a86";

export const icons = {
  index: function(props) {
    return <Octicons name="home" size={24} {...props} />;
  },
  search: function(props) {
    return <Octicons name="search" size={24} {...props} />;
  },
  menu: function(props) {
    return <Octicons name="three-bars" size={24} {...props} />;
  },
  settingsNotifications: function(props) {
    return <Octicons name="note" size={22} color={redColor} {...props} />;
  },
  settingsAccessibility: function(props) {
    return <Octicons name="accessibility" size={22} color={redColor} {...props} />;
  },
  settingsDownloads: function(props) {
    return <Octicons name="download" size={22} color={redColor} {...props} />;
  },
  settingsLanguage: function(props) {
    return <Octicons name="globe" size={22} color={redColor} {...props} />;
  },
  helpContact: function(props) {
    return <Octicons name="question" size={22} color={redColor} {...props} />;
  },
  helpFind: function(props) {
    return <Foundation name="magnifying-glass" size={22} color={redColor} />;
  },
  helpPrivacy: function(props) {
    return <MaterialCommunityIcons name="file-document-multiple-outline" size={22} color={redColor} />;
  },
  menuUp: function(props) {
    return <Octicons name="chevron-up" size={22} color={redColor} {...props} />;
  },
  menuDown: function(props) {
    return <Octicons name="chevron-down" size={22} color={redColor} {...props} />;
  },
  menuLeft: function(props) {
    return <Octicons name="chevron-left" size={22} color={redColor} {...props} />;
  },
  x: function(props) {
    return <Octicons name="x" size={22} {...props} />;
  },
}; 