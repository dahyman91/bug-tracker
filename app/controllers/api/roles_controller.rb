class Api::RolesController < ApplicationController
  skip_before_action :authorize, only: %i[show index]

  def index
    render json: Role.all
  end

  def show
    role = Role.find(params[:id])
    render json: role, status: :ok
  end

  def create
    role = Role.create!(role_params)
    render json: role, status: :created
  end

  def destroy
    role = Role.find_by(id: params[:id])
    role.destroy
    head :no_content
  end

  private

  def role_params
    params.permit(:name, :user_id, :project_id)
  end
end
