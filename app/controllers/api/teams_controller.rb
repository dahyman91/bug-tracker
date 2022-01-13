class Api::TeamsController < ApplicationController
  def create
    team = Team.create!(team_params)
    render json: team, status: :created
  end

  def index
    render json: Team.all
  end

  private

  def team_params
    params.permit(:name, :description)
  end
end
