import * as d3 from "d3";
import { Queue } from "./queue";

export class BracketRenderer {
  constructor(id, w = 710, h = 80) {
    this.svgWidth = w;
    this.svgHeight = h;

    // these values could be computed based on the canvas dimensions + tree depth
    this.boxHeight = 40;
    this.boxWidth = 120;

    this.textOffsetX = 110;
    this.textOffsetY = 25;

    this.elbowWidth = 25;
    this.elbowHeight = 25;
    this.connectorWidth = 50;

    // The configCache is a dictionary of queues, where the key is the depth
    // Since the brackets are rendered in a "breadth first manner" we can use
    // the queue to get the coordinates for the previous 'Elbow'
    this.configCache = new Map();

    this.svg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);
  }

  get baseOffsetY() {
    return this.svgHeight / 2;
  }

  _getVerticalConnectorHeight(depth) {
    return {
      3: 200,
      2: 100,
      1: 50,
    }[depth];
  }

  _renderBox(shapeGroup, team, opponent, tournamentWinner, coordinates) {
    const rect = shapeGroup
      .append("rect")
      .attr("x", coordinates.x)
      .attr("y", coordinates.y)
      .attr("width", this.boxWidth)
      .attr("height", this.boxHeight)
      .attr("stroke", "#4b5563")
      .attr("stroke-width", 0.2)
      .attr("class", `${team.code} ${opponent.code}`)
      .attr("fill", "white");

    rect.on("mouseover", function () {
      // highlight all rects with this code class
      document
        .querySelectorAll(`rect.${team.code}, rect.${opponent.code}`)
        .forEach((rect) => {
          rect.classList.add("highlight");
        });
    });

    rect.on("mouseout", function () {
      // remove all rects with this code class
      document
        .querySelectorAll(`rect.${team.code}, rect.${opponent.code}`)
        .forEach((rect) => {
          rect.classList.remove("highlight");
        });
    });

    const isTournamentWinner = team.name == tournamentWinner?.name;
    const textNode = isTournamentWinner ? `${team.name} 🏆` : team.name;

    shapeGroup
      .append("text")
      .attr("x", coordinates.x + this.textOffsetX)
      .attr("y", coordinates.y + this.textOffsetY)
      .attr("width", this.boxWidth)
      .attr("height", this.boxHeight)
      .attr("class", "flip text-sm font-semibold pointer-events-none")
      .text(() => textNode);
  }

  _renderSingle = (data) => {
    let config = {
      boxOffsetX: 0,
      boxOffsetY: this.baseOffsetY,
    };

    if (this.configCache.has(data.depth)) {
      const queue = this.configCache.get(data.depth);

      if (!queue.isEmpty) {
        config = queue.dequeue();
      }
    }

    const shapeGroup = this.svg.append("g");

    this._renderBox(shapeGroup, data.teamA, data.teamB, data.tournamentWinner, {
      x: config.boxOffsetX,
      y: config.boxOffsetY - this.boxHeight,
    });

    this._renderBox(shapeGroup, data.teamB, data.teamA, data.tournamentWinner, {
      x: config.boxOffsetX,
      y: config.boxOffsetY,
    });

    if (data.depth > 0) {
      this._renderElbow(shapeGroup, data, config);
    }
  };

  _renderElbow(shapeGroup, data, config) {
    // An elbow consists of 4 lines and connects the brackets. It looks like an elbow/trident hence the name

    const connectorWidth =
      this.boxWidth + this.connectorWidth + config.boxOffsetX;
    const connectorY = config.boxOffsetY;

    // horizontal connector
    shapeGroup
      .append("line")
      .attr("x1", this.boxWidth + config.boxOffsetX)
      .attr("y1", connectorY)
      .attr("x2", connectorWidth)
      .attr("y2", connectorY)
      .attr("stroke-width", 0.2)
      .attr("stroke", "#4b5563");

    // vertical elbow
    const verticalElbowHeight = this._getVerticalConnectorHeight(data.depth);
    const verticalTopY = config.boxOffsetY - verticalElbowHeight;
    const verticalBottomY = config.boxOffsetY + verticalElbowHeight;

    shapeGroup
      .append("line")
      .attr("x1", connectorWidth)
      .attr("y1", verticalTopY)
      .attr("x2", connectorWidth)
      .attr("y2", verticalBottomY)
      .attr("stroke-width", 0.2)
      .attr("stroke", "#4b5563");

    // top horizontal line
    const elbowEndsX = connectorWidth + this.elbowWidth;
    shapeGroup
      .append("line")
      .attr("x1", connectorWidth)
      .attr("y1", verticalTopY)
      .attr("x2", elbowEndsX)
      .attr("y2", verticalTopY)
      .attr("stroke-width", 0.2)
      .attr("stroke", "#4b5563");

    // bottom horizontal line
    shapeGroup
      .append("line")
      .attr("x1", connectorWidth)
      .attr("y1", verticalBottomY)
      .attr("x2", elbowEndsX)
      .attr("y2", verticalBottomY)
      .attr("stroke-width", 0.2)
      .attr("stroke", "#4b5563");

    this._addToCache(data.depth, elbowEndsX, verticalTopY, verticalBottomY);
  }

  _addToCache(depth, elbowEndsX, verticalTopY, verticalBottomY) {
    const nextDepth = depth - 1;
    if (!this.configCache.has(nextDepth)) {
      this.configCache.set(nextDepth, new Queue());
    }

    const queue = this.configCache.get(nextDepth);

    queue.enqueue({
      boxOffsetX: elbowEndsX,
      boxOffsetY: verticalTopY,
    });

    queue.enqueue({
      boxOffsetX: elbowEndsX,
      boxOffsetY: verticalBottomY,
    });
  }

  render(tree) {
    // Travese the tree in a BFS manner

    const queue = [];
    let current = tree.root;

    queue.push(current);

    while (queue.length) {
      current = queue.shift();

      this._renderSingle(current.data);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  }
}
