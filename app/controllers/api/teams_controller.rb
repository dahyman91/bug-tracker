class Api::TeamsController < ApplicationController
  def create
    team = Team.create!(team_params)
    render json: team, status: :created
  end

  def index
    render json: Team.all
  end

  def show
    team = Team.find(params[:id])
    render json: team
  end

  def destroy
    team = Team.find_by(id: params[:id])
    team.destroy
    head :no_content
  end

  private

  def team_params
    params.permit(:name, :description)
  end
end
