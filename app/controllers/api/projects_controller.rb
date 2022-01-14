class Api::ProjectsController < ApplicationController
  skip_before_action :authorize, only: %i[show index]

  def index
    render json: Project.all
  end

  def show
    project = Project.find(params[:id])
    render json: project, status: :ok
  end

  def create
    project = Project.create!(project_params)
    render json: project, status: :created
  end

  def destroy
    project = Project.find_by(id: params[:id])
    project.destroy
    head :no_content
  end
  
  private

  def project_params
    params.permit(:name, :description, :team_id)
  end
end
