class TasksController < ApplicationController

  def index
    @tasks = Task.all
    respond_to do |format|
      format.json {render json: @tasks}
      format.html
    end
  end

  def update
    @task = Task.find(params[:id])
    respond_to do |format|
      format.json {
        if @task.update_attributes(task_params)
          render json: @task
        else
          render status: :unprocessable_entity
        end
      }
    end
  end

  def create
    @task = Task.new(task_params)
    @task.completed = false
    respond_to do |format|
      format.json {
        if @task.save
          render json: @task
        else
          render status: :bad_request
        end
      }
    end
  end

  private
  def task_params
    params.require(:task).permit(:name, :completed)
  end

end
