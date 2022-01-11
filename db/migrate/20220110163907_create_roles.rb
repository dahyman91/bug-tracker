class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.string :name
      t.integer :user_id
      t.integer :project_id

      t.timestamps
    end
  end
end
