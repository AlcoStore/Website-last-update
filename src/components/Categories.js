import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Categories extends React.Component {
  handleCatClick = name => {
    const { onCatClick } = this.props;
    onCatClick(name);
  };

  render() {
    const { name, image } = this.props;

    return (
        <div className="shp-col-md-3 shp-col-sm-6">
          <Card className="CategoryItem" onClick={() => this.handleCatClick(name)}>
            <CardContent className="CategoryImageDiv">
              <img alt={name} src={image} className="CategoryImage" />
            </CardContent>
          </Card>
        </div>

    );
  }
}

export default Categories;
